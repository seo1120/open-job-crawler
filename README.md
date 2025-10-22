<div align="center">

# 🚀 Open Job Crawler

**미국 인턴·주니어 개발자 포지션 자동 수집 피드**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://open-job-crawler.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/seo1120/open-job-crawler)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-4285f4?style=for-the-badge&logo=google)](https://ai.google.dev/)

*Playwright + Google Gemini AI로 구축된 스마트 취업 공고 수집 시스템*

</div>

---

## ✨ 주요 기능

### 🤖 **AI 기반 데이터 가공**
- **Google Gemini 2.0 Flash**로 한국어 요약 및 태그 자동 생성
- **회사명, 위치, 설명** 정확한 추출 및 정리
- **스마트 태깅**: 기술 스택, 근무 형태, 경력 수준 자동 분류

### 🕷️ **고성능 크롤링**
- **Playwright** 기반 안정적인 웹 크롤링
- **GoodFirstJob** 등 다양한 취업 사이트 지원
- **실시간 데이터** 수집 및 업데이트

### 🎨 **모던 UI/UX**
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- **실시간 검색**: 포지션, 회사, 위치별 즉시 필터링
- **다양한 정렬**: 최신순, 회사명, 포지션별 정렬
- **Slack 알림**: 새 공고 발견 시 즉시 알림

### 🔍 **스마트 검색**
- **통합 검색**: 제목, 회사, 위치, 설명 통합 검색
- **태그 필터**: 기술 스택, 근무 형태별 필터링
- **컴팩트 모드**: 더 많은 공고를 한 번에 확인

---

## 🚀 빠른 시작

### 1️⃣ **저장소 클론**
```bash
git clone https://github.com/seo1120/open-job-crawler.git
cd open-job-crawler
```

### 2️⃣ **의존성 설치**
```bash
npm install
```

### 3️⃣ **환경변수 설정**
```bash
# .env 파일 생성
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

### 4️⃣ **데이터 수집 및 가공**
```bash
# 전체 파이프라인 실행
npm run pipeline

# 또는 단계별 실행
npm run crawl      # 크롤링
npm run process    # Gemini 가공
```

### 5️⃣ **개발 서버 실행**
```bash
npm run dev
```

**🌐 http://localhost:8000**에서 확인하세요!

---

## 📁 프로젝트 구조

```
open-job-crawler/
├── 📄 index.html                    # 메인 웹앱 (React 없이 바닐라 JS)
├── 📦 package.json                  # 프로젝트 설정 및 스크립트
├── ⚙️ vercel.json                   # Vercel 배포 설정
├── 📖 README.md                     # 프로젝트 문서
│
├── 🕷️ crawler/                      # 크롤링 엔진
│   └── goodfirstjob.js              # GoodFirstJob 크롤러
│
├── 📊 data/                         # 데이터 저장소
│   ├── jobs.json                    # 최종 공고 데이터
│   ├── processed_jobs.json          # Gemini 가공 데이터
│   └── test_processed_job.json      # 테스트 데이터
│
└── 🔧 scripts/                      # 데이터 처리 파이프라인
    ├── run-pipeline.js              # 전체 파이프라인 실행
    ├── process-with-gemini.js       # Gemini AI 가공
    ├── clean-data.js                # 데이터 정리
    └── test-gemini.js               # Gemini API 테스트
```

---

## 🛠️ 기술 스택

### **Frontend**
- **HTML5** + **CSS3** (Tailwind CSS)
- **Vanilla JavaScript** (ES6+)
- **반응형 디자인**

### **Backend & AI**
- **Node.js** + **Playwright** (크롤링)
- **Google Gemini 2.0 Flash** (AI 가공)
- **JSON** (데이터 저장)

### **Deployment**
- **Vercel** (정적 사이트 호스팅)
- **GitHub Actions** (자동 배포)

---

## 🎯 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run crawl` | GoodFirstJob 크롤링 실행 |
| `npm run process` | Gemini AI로 데이터 가공 |
| `npm run pipeline` | 전체 파이프라인 실행 |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |

---

## 🌐 배포

### **Vercel 배포 (권장)**

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **프로젝트 배포**
   ```bash
   vercel --prod
   ```

3. **환경변수 설정**
   - Vercel 대시보드 → Settings → Environment Variables
   - `GEMINI_API_KEY` 추가

### **다른 플랫폼**
- **Netlify**: `netlify deploy`
- **GitHub Pages**: GitHub Actions 사용
- **AWS S3**: 정적 웹사이트 호스팅

---

## 🤝 기여하기

### **버그 리포트**
- 🐛 [Issues](https://github.com/seo1120/open-job-crawler/issues)에서 버그 리포트
- 📝 상세한 재현 단계와 환경 정보 포함

### **기능 요청**
- 💡 [Discussions](https://github.com/seo1120/open-job-crawler/discussions)에서 아이디어 공유
- 🚀 새로운 크롤링 사이트 제안

### **코드 기여**
1. **Fork** 저장소
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** 브랜치 (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

---

## 📊 성능

- **크롤링 속도**: 평균 19개 공고 수집 (30초 내)
- **AI 가공**: Gemini 2.0 Flash로 고품질 한국어 요약
- **로딩 속도**: Vercel CDN으로 전 세계 빠른 접근
- **반응성**: 모바일/데스크톱 완벽 지원

---

## 🔮 로드맵

### **v2.0 (계획 중)**
- [ ] **다중 사이트 크롤링** (원티드, 로켓펀치, 사람인)
- [ ] **실시간 알림** (이메일, Discord, Slack)
- [ ] **사용자 맞춤 필터** (기술 스택, 경력, 지역)
- [ ] **데이터 시각화** (차트, 통계)

### **v3.0 (장기 계획)**
- [ ] **AI 추천 시스템** (개인 맞춤 공고 추천)
- [ ] **채용 트렌드 분석** (기술 스택 트렌드)
- [ ] **API 서비스** (다른 앱에서 활용 가능)

---

## 📄 라이선스

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🙏 감사의 말

- **GoodFirstJob** - 훌륭한 인턴십 공고 플랫폼
- **Google Gemini** - 강력한 AI 언어 모델
- **Playwright** - 안정적인 웹 자동화 도구
- **Vercel** - 빠르고 간편한 배포 플랫폼

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/seo1120/open-job-crawler?style=social)](https://github.com/seo1120/open-job-crawler/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/seo1120/open-job-crawler?style=social)](https://github.com/seo1120/open-job-crawler/network)

*Made with ❤️ by [seo1120](https://github.com/seo1120)*

</div>

---

# 🌍 English

<div align="center">

# 🚀 Open Job Crawler

**Automated US Intern & Junior Developer Job Collection Feed**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://open-job-crawler.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/seo1120/open-job-crawler)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-4285f4?style=for-the-badge&logo=google)](https://ai.google.dev/)

*Smart job collection system built with Playwright + Google Gemini AI*

</div>

---

## ✨ Key Features

### 🤖 **AI-Powered Data Processing**
- **Google Gemini 2.0 Flash** for Korean summarization and auto-tagging
- **Accurate extraction** of company names, locations, and descriptions
- **Smart tagging**: Automatic classification by tech stack, work type, experience level

### 🕷️ **High-Performance Crawling**
- **Playwright-based** stable web crawling
- **Multi-site support** including GoodFirstJob and more
- **Real-time data** collection and updates

### 🎨 **Modern UI/UX**
- **Responsive design**: Perfect support for mobile/tablet/desktop
- **Real-time search**: Instant filtering by position, company, location
- **Multiple sorting**: Latest, company name, position-based sorting
- **Slack notifications**: Instant alerts for new job postings

### 🔍 **Smart Search**
- **Unified search**: Combined search across title, company, location, description
- **Tag filtering**: Filter by tech stack, work type
- **Compact mode**: View more job postings at once

---

## 🚀 Quick Start

### 1️⃣ **Clone Repository**
```bash
git clone https://github.com/seo1120/open-job-crawler.git
cd open-job-crawler
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Set Environment Variables**
```bash
# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

### 4️⃣ **Collect and Process Data**
```bash
# Run complete pipeline
npm run pipeline

# Or run step by step
npm run crawl      # Crawling
npm run process    # Gemini processing
```

### 5️⃣ **Start Development Server**
```bash
npm run dev
```

**🌐 Visit http://localhost:8000**

---

## 📁 Project Structure

```
open-job-crawler/
├── 📄 index.html                    # Main web app (Vanilla JS, no React)
├── 📦 package.json                  # Project settings and scripts
├── ⚙️ vercel.json                   # Vercel deployment config
├── 📖 README.md                     # Project documentation
│
├── 🕷️ crawler/                      # Crawling engine
│   └── goodfirstjob.js              # GoodFirstJob crawler
│
├── 📊 data/                         # Data storage
│   ├── jobs.json                    # Final job data
│   ├── processed_jobs.json          # Gemini processed data
│   └── test_processed_job.json      # Test data
│
└── 🔧 scripts/                      # Data processing pipeline
    ├── run-pipeline.js              # Complete pipeline execution
    ├── process-with-gemini.js       # Gemini AI processing
    ├── clean-data.js                # Data cleaning
    └── test-gemini.js               # Gemini API testing
```

---

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** + **CSS3** (Tailwind CSS)
- **Vanilla JavaScript** (ES6+)
- **Responsive Design**

### **Backend & AI**
- **Node.js** + **Playwright** (Crawling)
- **Google Gemini 2.0 Flash** (AI Processing)
- **JSON** (Data Storage)

### **Deployment**
- **Vercel** (Static Site Hosting)
- **GitHub Actions** (Auto Deployment)

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run crawl` | Run GoodFirstJob crawling |
| `npm run process` | Process data with Gemini AI |
| `npm run pipeline` | Run complete pipeline |
| `npm run dev` | Start local development server |
| `npm run build` | Production build |

---

## 🌐 Deployment

### **Vercel Deployment (Recommended)**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Project**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Add `GEMINI_API_KEY`

### **Other Platforms**
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Static website hosting

---

## 🤝 Contributing

### **Bug Reports**
- 🐛 Report bugs in [Issues](https://github.com/seo1120/open-job-crawler/issues)
- 📝 Include detailed reproduction steps and environment info

### **Feature Requests**
- 💡 Share ideas in [Discussions](https://github.com/seo1120/open-job-crawler/discussions)
- 🚀 Suggest new crawling sites

### **Code Contributions**
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** branch (`git push origin feature/amazing-feature`)
5. **Create** Pull Request

---

## 📊 Performance

- **Crawling Speed**: Average 19 job postings collected (within 30 seconds)
- **AI Processing**: High-quality Korean summarization with Gemini 2.0 Flash
- **Loading Speed**: Fast global access via Vercel CDN
- **Responsiveness**: Perfect mobile/desktop support

---

## 🔮 Roadmap

### **v2.0 (Planned)**
- [ ] **Multi-site crawling** (Wanted, RocketPunch, Saramin)
- [ ] **Real-time notifications** (Email, Discord, Slack)
- [ ] **Custom filters** (Tech stack, experience, location)
- [ ] **Data visualization** (Charts, statistics)

### **v3.0 (Long-term)**
- [ ] **AI recommendation system** (Personalized job recommendations)
- [ ] **Hiring trend analysis** (Tech stack trends)
- [ ] **API service** (Available for other apps)

---

## 📄 License

This project is distributed under the **MIT License**. See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GoodFirstJob** - Excellent internship platform
- **Google Gemini** - Powerful AI language model
- **Playwright** - Reliable web automation tool
- **Vercel** - Fast and easy deployment platform

---

<div align="center">

**⭐ If this project helped you, please give it a Star! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/seo1120/open-job-crawler?style=social)](https://github.com/seo1120/open-job-crawler/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/seo1120/open-job-crawler?style=social)](https://github.com/seo1120/open-job-crawler/network)

*Made with ❤️ by [seo1120](https://github.com/seo1120)*

</div>
