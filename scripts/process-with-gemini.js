const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function processJobsWithGemini() {
  console.log('🤖 Google Gemini으로 데이터 가공 시작...');
  
  // Gemini API 초기화
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  try {
    // 기존 데이터 로드
    const dataPath = path.join(__dirname, '..', 'data', 'jobs.json');
    const jobs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`📊 ${jobs.length}개의 공고를 Gemini로 가공 중...`);
    
    const processedJobs = [];
    
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      console.log(`처리 중: ${i + 1}/${jobs.length} - ${job.position}`);
      
      try {
        // Gemini에게 데이터 정리 요청
        const prompt = `
다음 인턴십 공고 정보를 분석하고 정리해주세요:

원본 텍스트: "${job.summary_ko}"
포지션: "${job.position}"

다음 JSON 형식으로 응답해주세요:
{
  "company": "회사명",
  "location": "위치 (도시, 주/국가)",
  "summary_ko": "한국어로 요약된 설명 (100자 이내)",
  "tags": ["태그1", "태그2", "태그3"],
  "is_remote": true/false,
  "is_internship": true/false
}

규칙:
- 회사명은 정확히 추출
- 위치는 도시, 주/국가 형태로 정리
- summary_ko는 한국어로 간단히 요약
- tags는 관련 기술이나 특징 (예: "Python", "React", "원격근무", "인턴십")
- JSON만 응답하고 다른 텍스트는 포함하지 마세요
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // JSON 파싱 시도
        let geminiData;
        try {
          // JSON 부분만 추출
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            geminiData = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('JSON을 찾을 수 없음');
          }
        } catch (parseError) {
          console.log(`⚠️  JSON 파싱 실패, 기본값 사용: ${parseError.message}`);
          geminiData = {
            company: job.company,
            location: job.location,
            summary_ko: job.summary_ko.substring(0, 100),
            tags: [],
            is_remote: false,
            is_internship: true
          };
        }
        
        // 원본 데이터와 Gemini 가공 데이터 병합
        const processedJob = {
          ...job,
          company: geminiData.company || job.company,
          location: geminiData.location || job.location,
          summary_ko: geminiData.summary_ko || job.summary_ko,
          tags: geminiData.tags || [],
          is_remote: geminiData.is_remote || false,
          is_internship: geminiData.is_internship !== false,
          processed_at: new Date().toISOString()
        };
        
        processedJobs.push(processedJob);
        
        // API 호출 간격 조절 (Rate limiting 방지)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${job.position} 처리 실패: ${error.message}`);
        // 실패한 경우 원본 데이터 유지
        processedJobs.push({
          ...job,
          processed_at: new Date().toISOString(),
          processing_error: error.message
        });
      }
    }
    
    // 가공된 데이터 저장
    const outputPath = path.join(__dirname, '..', 'data', 'processed_jobs.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedJobs, null, 2), 'utf8');
    
    console.log(`✅ ${processedJobs.length}개의 공고가 Gemini로 가공되었습니다.`);
    console.log(`💾 가공된 데이터가 ${outputPath}에 저장되었습니다.`);
    
    return processedJobs;
    
  } catch (error) {
    console.error('❌ Gemini 가공 중 오류 발생:', error);
    throw error;
  }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
  processJobsWithGemini()
    .then(jobs => {
      console.log(`🎉 Gemini 가공 완료! 총 ${jobs.length}개의 공고가 처리되었습니다.`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Gemini 가공 실패:', error);
      process.exit(1);
    });
}

module.exports = { processJobsWithGemini };
