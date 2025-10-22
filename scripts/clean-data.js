const fs = require('fs');
const path = require('path');

function cleanJobData() {
  console.log('🧹 데이터 정리 시작...');
  
  try {
    // 기존 데이터 로드
    const dataPath = path.join(__dirname, '..', 'data', 'jobs.json');
    const jobs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`📊 ${jobs.length}개의 공고를 정리 중...`);
    
    const cleanedJobs = jobs.map((job, index) => {
      // 포지션명 정리 (불필요한 텍스트 제거)
      let cleanPosition = job.position;
      
      // 여러 줄로 된 텍스트를 첫 번째 줄만 사용
      const lines = cleanPosition.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      if (lines.length > 0) {
        cleanPosition = lines[0];
      }
      
      // 회사명 추출 시도
      let company = '회사명 없음';
      const companyPatterns = [
        /General Dynamics Mission Systems/i,
        /WhatNot/i,
        /John Deere/i,
        /State of Wisconsin Investment Board/i,
        /Amazon/i,
        /Google/i,
        /Microsoft/i,
        /Apple/i
      ];
      
      for (const pattern of companyPatterns) {
        const match = job.summary_ko.match(pattern);
        if (match) {
          company = match[0];
          break;
        }
      }
      
      // 위치 정보 정리
      let cleanLocation = job.location;
      if (cleanLocation === '위치 미기재') {
        // summary에서 위치 정보 추출 시도
        const locationMatch = job.summary_ko.match(/([A-Z][a-z]+,\s*[A-Z]{2})/);
        if (locationMatch) {
          cleanLocation = locationMatch[1];
        }
      }
      
      // 한국어 요약 생성
      let summaryKo = job.summary_ko;
      
      // 간단한 한국어 요약 생성
      if (cleanPosition.includes('Amazon Web Services')) {
        summaryKo = 'Amazon Web Services 인턴십 - 다양한 팀에서 근무할 수 있는 기회';
      } else if (cleanPosition.includes('Software Engineer')) {
        summaryKo = '소프트웨어 엔지니어 인턴십 - 개발 경험을 쌓을 수 있는 기회';
      } else if (cleanPosition.includes('Engineering')) {
        summaryKo = '엔지니어링 인턴십 - 기술적 역량을 향상시킬 수 있는 기회';
      } else {
        summaryKo = '인턴십 포지션 - 실무 경험을 쌓을 수 있는 기회';
      }
      
      // 태그 생성
      const tags = [];
      if (cleanPosition.toLowerCase().includes('software')) tags.push('소프트웨어');
      if (cleanPosition.toLowerCase().includes('engineering')) tags.push('엔지니어링');
      if (cleanPosition.toLowerCase().includes('data')) tags.push('데이터');
      if (cleanPosition.toLowerCase().includes('cloud')) tags.push('클라우드');
      if (cleanLocation.includes('Remote') || cleanLocation.includes('원격')) tags.push('원격근무');
      if (cleanLocation.includes('|')) tags.push('다중지역');
      tags.push('인턴십');
      
      return {
        ...job,
        position: cleanPosition,
        company: company,
        location: cleanLocation,
        summary_ko: summaryKo,
        tags: tags,
        cleaned_at: new Date().toISOString()
      };
    });
    
    // 정리된 데이터 저장
    const outputPath = path.join(__dirname, '..', 'data', 'jobs.json');
    fs.writeFileSync(outputPath, JSON.stringify(cleanedJobs, null, 2), 'utf8');
    
    console.log(`✅ ${cleanedJobs.length}개의 공고가 정리되었습니다.`);
    console.log(`💾 정리된 데이터가 ${outputPath}에 저장되었습니다.`);
    
    // 샘플 데이터 출력
    console.log('\n📋 정리된 샘플 데이터:');
    console.log('포지션:', cleanedJobs[0].position);
    console.log('회사:', cleanedJobs[0].company);
    console.log('위치:', cleanedJobs[0].location);
    console.log('요약:', cleanedJobs[0].summary_ko);
    console.log('태그:', cleanedJobs[0].tags);
    
    return cleanedJobs;
    
  } catch (error) {
    console.error('❌ 데이터 정리 중 오류 발생:', error);
    throw error;
  }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
  cleanJobData()
    .then(jobs => {
      console.log(`🎉 데이터 정리 완료! 총 ${jobs.length}개의 공고가 정리되었습니다.`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 데이터 정리 실패:', error);
      process.exit(1);
    });
}

module.exports = { cleanJobData };
