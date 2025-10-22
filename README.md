# Open Job Crawler

인턴·주니어 개발자 포지션 자동 수집 피드

## 🚀 배포 방법

### Vercel 배포

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **프로젝트 배포**
   ```bash
   vercel
   ```

4. **환경변수 설정**
   - Vercel 대시보드에서 프로젝트 선택
   - Settings → Environment Variables
   - `GEMINI_API_KEY` 추가

## 🔧 로컬 개발

```bash
# 의존성 설치
npm install

# 크롤링 실행
npm run crawl

# Gemini 가공
npm run process

# 전체 파이프라인
npm run pipeline

# 개발 서버
npm run dev
```

## 📁 프로젝트 구조

```
open-job-crawler/
├── index.html              # 웹앱
├── crawler/                # 크롤링 스크립트
├── scripts/                # 데이터 가공 스크립트
├── data/                   # JSON 데이터
└── vercel.json            # Vercel 설정
```

## 🎯 기능

- **자동 크롤링**: GoodFirstJob에서 인턴십 공고 수집
- **AI 가공**: Google Gemini로 한국어 요약 및 태그 생성
- **검색 & 필터**: 포지션, 회사, 위치별 검색
- **반응형 UI**: 모바일/데스크톱 지원
