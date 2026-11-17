# NMA — 나만의 뮤직 어워드

블랙·핑크·옐로우 테마의 라인업 / 큐시트 제작 사이트입니다. HTML, CSS, JavaScript로 작성되어 VS Code에서 바로 수정할 수 있습니다. 별도 API 키나 패키지 설치가 필요하지 않습니다.

## VS Code에서 실행

1. 이 폴더를 VS Code의 **파일 → 폴더 열기**로 엽니다.
2. Node.js가 설치되어 있다면 터미널에서 `npm run dev`를 실행합니다.
3. `http://127.0.0.1:4175`로 접속합니다. 종료는 터미널에서 Ctrl+C입니다.
4. 이름/사진 관리 화면: `http://127.0.0.1:4175/catalog-editor.html`.

Node.js 없이도 `catalog-editor.html`을 더블클릭해 관리 도구를 사용할 수 있습니다. 사이트 본체는 JSON을 읽기 때문에 HTML 파일 더블클릭 대신 로컬 서버로 열어주세요.

## 이름과 사진 수정

실제 사이트 목록은 **dist/artists.json**입니다. `catalog-editor.html`의 HTML 끝에 명단을 붙이지 마세요.

- 관리 도구에서 기존 항목을 검색하고 **수정**합니다. 사진은 선택사항입니다.
- **목록 파일 저장**으로 받은 `artists.json`을 프로젝트의 `dist/artists.json`과 교체합니다.
- 다음 편집 시 **기존 목록 불러오기**로 최신 JSON을 선택합니다. 또는 `npm run catalog:sync`로 관리 도구 기본 목록을 갱신합니다.
- 이름, 영문명, 검색용 별칭, 소속 그룹은 모두 검색됩니다. 대소문자·공백·기호 차이는 무시합니다.
- 동명이인은 소속 그룹으로 구분합니다. 그룹에서 개인을 선택할 수 있도록 멤버도 별도 항목으로 등록되어 있습니다.
- `CATALOG-SOURCES.md`에 명단 범위와 출처를 정리했습니다. 멤버 명단은 각 출처 시점의 현·전 멤버를 포함하며, 모든 멤버의 개별 시상식 참석을 뜻하지 않습니다.

## GitHub 업로드와 공개 배포

1. GitHub에서 빈 저장소를 만듭니다.
2. 압축을 푼 프로젝트 폴더를 VS Code에서 엽니다.
3. 소스 제어에서 **저장소 초기화 → 커밋 → GitHub에 게시**합니다. 아래 명령을 사용해도 됩니다.

```powershell
git init -b main
git add .
git commit -m "Create NMA awards site"
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

4. GitHub 저장소 **Settings → Pages → Source → GitHub Actions**를 선택합니다.
5. **Actions → Deploy NMA to GitHub Pages**에서 실행 결과를 확인합니다. 필요하면 **Run workflow**를 누릅니다.
6. 완료 후 Pages에 표시되는 공개 주소를 X에 공유합니다.

`.github/workflows/pages.yml`이 **dist/** 폴더만 배포합니다. 관리 도구는 공개 사이트에 배포되지 않지만, GitHub 저장소를 public으로 만들면 저장소 파일은 공개됩니다. 기존 작업 폴더에는 이미 Git 기록이 있을 수 있으므로 위 초기화 절차는 전달한 ZIP을 새로 푼 폴더 기준입니다.

수정 후 `git add .` → `git commit -m "Update catalog"` → `git push`를 실행하면 main 브랜치 변경이 자동 배포됩니다.

## 파일 구성

- `dist/index.html`: 페이지 기본 구조
- `dist/style.css`: 디자인과 반응형 화면
- `dist/app.js`: 라인업, 큐시트, 노래 검색, PNG 저장
- `dist/catalog.js`: 목록 검증과 한영 검색
- `dist/artists.json`: 그룹/솔로/멤버 데이터와 등록 사진
- `catalog-editor.html`, `.css`, `.js`: 운영자용 목록 관리 도구
- `catalog-seed.js`: 관리 도구의 기본 목록 (JSON으로부터 생성)
- `research-*.json`: 명단 조사 자료
- `tests/catalog.test.mjs`: 검색·데이터 보존 검사

노래 검색은 기존 Apple iTunes Search API를 사용합니다. 아티스트 사진은 자동 수집하지 않습니다. 방문자의 작성 내용은 각자 브라우저에 저장되며 다른 기기와 동기화되지 않습니다.

## 검사

`npm test`로 명단과 검색 검사를 실행합니다. 공개 배포 전에 `npm run dev`로 라인업 선택 → 큐시트 생성 → 노래 추가 → 이미지 저장 흐름을 확인하세요.
