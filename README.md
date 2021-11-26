# 순천향대학교 정보보호학과 데이터베이스 기말 프로젝트

---

## Summary 
순천향대학교 재학생을 위한 중고장터   
- Back-End: node.js + express + mariadb
- Front-End: html + css (vanilla style, no bootstrap)

## Domain
http://lovememore.kro.kr/

## Get started
```
node index.js
or
pm2 start index.js
# no npm start
```

---
### 과제 내용
순천향대학교 재학생을 위한 중고장터 개발

### 과제 조건
- 데이터베이스 사용 및 자신이 사용 할 수 있는 언어로 구현   
- 데이터베이스의 CRUD 기능이 포함되어야 함    
- 물품 종류는 5개 이상, 물품의 수는 50개 이상   
- 거래는 맞교환 및 현금거래만 가능 (신용카드 X)   

### 이미 구현된 내용
- 로그인 및 회원가입
- 중고 물품 조회
- (특정한) 중고 물품에 좋아요 달기 기능
- (특정한) 중고 물품에 댓글 달기 기능

### 구현해야 할 기능
- 중고 물품의 type 별로 검색 기능   
- 중고 물품 추가 및 게시글 추가 기능
- 게시글 삭제 기능   
- 중고 물품의 거래 요청 기능 및 맞교환 기능