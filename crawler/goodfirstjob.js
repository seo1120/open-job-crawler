const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function crawlGoodFirstJob() {
  console.log('🚀 GoodFirstJob 크롤링 시작...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // User-Agent 설정
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    console.log('📄 페이지 로딩 중...');
    await page.goto('https://www.goodfirstjob.com/internships', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForTimeout(3000);
    
    console.log('🔍 인턴십 공고 수집 중...');
    
    // 페이지 HTML 구조 디버깅
    console.log('🔍 페이지 구조 분석 중...');
    const pageContent = await page.content();
    console.log('페이지 제목:', await page.title());
    
    // 모든 링크와 텍스트 요소 확인
    const allLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        classes: link.className
      })).filter(link => link.text.length > 0);
    });
    
    console.log('발견된 링크들:', allLinks.slice(0, 10)); // 처음 10개만 출력
    
    // 인턴십 공고 데이터 수집 - 링크 기반 접근
    const jobs = await page.evaluate(() => {
      // Apply 링크들을 찾아서 각각의 부모 요소에서 정보 추출
      const applyLinks = Array.from(document.querySelectorAll('a')).filter(link => 
        link.textContent.trim() === 'Apply' && link.href.includes('http')
      );
      
      console.log(`Apply 링크 ${applyLinks.length}개 발견`);
      
      const jobs = [];
      
      applyLinks.forEach((link, index) => {
        try {
          // Apply 링크의 부모 요소들에서 정보 추출
          let parent = link.parentElement;
          let jobInfo = null;
          
          // 부모 요소들을 거슬러 올라가면서 정보 찾기
          for (let i = 0; i < 5 && parent; i++) {
            const text = parent.textContent.trim();
            
            // 인턴십 관련 텍스트가 있는 부모 요소 찾기
            if (text.includes('Intern') && text.length > 20 && text.length < 2000) {
              jobInfo = {
                element: parent,
                text: text
              };
              break;
            }
            parent = parent.parentElement;
          }
          
          if (jobInfo) {
            const text = jobInfo.text;
            const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
            
            // 제목 추출 (가장 긴 줄이나 Intern이 포함된 줄)
            let title = '';
            for (const line of lines) {
              if (line.includes('Intern') && line.length > 10) {
                title = line;
                break;
              }
            }
            
            // 제목을 찾지 못했다면 첫 번째 긴 줄 사용
            if (!title) {
              title = lines.find(line => line.length > 10) || '제목 없음';
            }
            
            // 회사명 추출 (제목 다음 줄)
            let company = '';
            const titleIndex = lines.findIndex(line => line === title);
            if (titleIndex !== -1 && lines[titleIndex + 1]) {
              company = lines[titleIndex + 1];
            }
            
            // 위치 추출 (도시, 주 패턴)
            let location = '';
            const locationMatch = text.match(/([A-Z][a-z]+,\s*[A-Z]{2})/);
            if (locationMatch) {
              location = locationMatch[1];
            }
            
            // 여러 위치가 있는 경우
            const multiLocationMatch = text.match(/([A-Z][a-z]+,\s*[A-Z]{2}.*?[A-Z][a-z]+,\s*[A-Z]{2})/);
            if (multiLocationMatch) {
              location = multiLocationMatch[1];
            }
            
            if (title && title !== '제목 없음' && title.length > 3) {
              jobs.push({
                slug: `goodfirstjob-${index}-${Date.now()}`,
                position: title,
                company: company || '회사명 없음',
                location: location || '위치 미기재',
                url: link.href,
                summary_ko: text.substring(0, 200).replace(/\s+/g, ' ').trim(),
                source: 'GoodFirstJob',
                crawled_at: new Date().toISOString()
              });
            }
          }
        } catch (error) {
          console.log(`공고 ${index} 처리 중 오류:`, error.message);
        }
      });
      
      return jobs;
    });
    
    console.log(`✅ ${jobs.length}개의 인턴십 공고를 수집했습니다.`);
    
    // 데이터 저장
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const outputPath = path.join(dataDir, 'jobs.json');
    fs.writeFileSync(outputPath, JSON.stringify(jobs, null, 2), 'utf8');
    
    console.log(`💾 데이터가 ${outputPath}에 저장되었습니다.`);
    
    return jobs;
    
  } catch (error) {
    console.error('❌ 크롤링 중 오류 발생:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// 스크립트가 직접 실행될 때만 크롤링 실행
if (require.main === module) {
  crawlGoodFirstJob()
    .then(jobs => {
      console.log(`🎉 크롤링 완료! 총 ${jobs.length}개의 공고를 수집했습니다.`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 크롤링 실패:', error);
      process.exit(1);
    });
}

module.exports = { crawlGoodFirstJob };
