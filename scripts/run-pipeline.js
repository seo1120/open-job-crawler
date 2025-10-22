const { crawlGoodFirstJob } = require('../crawler/goodfirstjob');
const { processJobsWithGemini } = require('./process-with-gemini');
const fs = require('fs');
const path = require('path');

async function runFullPipeline() {
  console.log('🚀 전체 파이프라인 시작: 크롤링 → Gemini 가공 → 웹앱 연동');
  
  try {
    // 1단계: 크롤링
    console.log('\n📥 1단계: GoodFirstJob 크롤링...');
    const crawledJobs = await crawlGoodFirstJob();
    console.log(`✅ ${crawledJobs.length}개의 공고를 크롤링했습니다.`);
    
    // 2단계: Gemini 가공 (API 키가 있는 경우만)
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      console.log('\n🤖 2단계: Google Gemini으로 데이터 가공...');
      const processedJobs = await processJobsWithGemini();
      console.log(`✅ ${processedJobs.length}개의 공고를 Gemini로 가공했습니다.`);
      
      // 웹앱에서 사용할 최종 데이터 파일 생성
      const finalDataPath = path.join(__dirname, '..', 'data', 'jobs.json');
      fs.writeFileSync(finalDataPath, JSON.stringify(processedJobs, null, 2), 'utf8');
      console.log(`💾 최종 데이터가 ${finalDataPath}에 저장되었습니다.`);
    } else {
      console.log('\n⚠️  Gemini API 키가 설정되지 않았습니다. 원본 데이터를 사용합니다.');
      console.log('💡 .env 파일에 GEMINI_API_KEY를 설정하면 Gemini 가공을 사용할 수 있습니다.');
    }
    
    // 3단계: 웹앱 실행 안내
    console.log('\n🌐 3단계: 웹앱 실행');
    console.log('다음 명령어로 웹앱을 실행할 수 있습니다:');
    console.log('  npm run dev');
    console.log('  또는');
    console.log('  python -m http.server 8000');
    console.log('그 후 http://localhost:8000 에서 확인하세요!');
    
    console.log('\n🎉 파이프라인 완료!');
    
  } catch (error) {
    console.error('❌ 파이프라인 실행 중 오류:', error);
    throw error;
  }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
  runFullPipeline()
    .then(() => {
      console.log('🎉 전체 파이프라인이 성공적으로 완료되었습니다!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 파이프라인 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { runFullPipeline };
