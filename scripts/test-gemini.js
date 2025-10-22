const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function testGeminiWithOneJob() {
  console.log('🤖 Gemini 테스트: 1개 공고만 가공...');
  
  // Gemini API 초기화
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  try {
    // 기존 데이터 로드
    const dataPath = path.join(__dirname, '..', 'data', 'jobs.json');
    const jobs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // 첫 번째 공고만 선택
    const testJob = jobs[0];
    console.log(`📊 테스트할 공고: ${testJob.position}`);
    
    // Gemini에게 데이터 정리 요청
    const prompt = `
다음 인턴십 공고 정보를 분석하고 정리해주세요:

원본 텍스트: "${testJob.summary_ko}"
포지션: "${testJob.position}"
위치: "${testJob.location}"

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
    
    console.log('🔄 Gemini API 호출 중...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('📝 Gemini 응답:');
    console.log(text);
    
    // JSON 파싱 시도
    let geminiData;
    try {
      // JSON 부분만 추출
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        geminiData = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON 파싱 성공!');
        console.log('가공된 데이터:', geminiData);
      } else {
        throw new Error('JSON을 찾을 수 없음');
      }
    } catch (parseError) {
      console.log(`⚠️  JSON 파싱 실패: ${parseError.message}`);
      console.log('원본 응답:', text);
      return;
    }
    
    // 원본 데이터와 Gemini 가공 데이터 병합
    const processedJob = {
      ...testJob,
      company: geminiData.company || testJob.company,
      location: geminiData.location || testJob.location,
      summary_ko: geminiData.summary_ko || testJob.summary_ko,
      tags: geminiData.tags || [],
      is_remote: geminiData.is_remote || false,
      is_internship: geminiData.is_internship !== false,
      processed_at: new Date().toISOString()
    };
    
    console.log('\n🎉 최종 가공된 공고:');
    console.log('포지션:', processedJob.position);
    console.log('회사:', processedJob.company);
    console.log('위치:', processedJob.location);
    console.log('요약:', processedJob.summary_ko);
    console.log('태그:', processedJob.tags);
    
    // 테스트 결과 저장
    const outputPath = path.join(__dirname, '..', 'data', 'test_processed_job.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedJob, null, 2), 'utf8');
    console.log(`\n💾 테스트 결과가 ${outputPath}에 저장되었습니다.`);
    
    return processedJob;
    
  } catch (error) {
    console.error('❌ Gemini 테스트 중 오류 발생:', error);
    throw error;
  }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
  testGeminiWithOneJob()
    .then(job => {
      console.log(`🎉 Gemini 테스트 완료!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Gemini 테스트 실패:', error);
      process.exit(1);
    });
}

module.exports = { testGeminiWithOneJob };
