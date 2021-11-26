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
필수 기능
- 로그인 및 회원가입 / 로그아웃
- 중고 물품 조회 및 페이징
- 중고 물품의 type 별로 검색 기능
- 중고 물품 추가 및 게시글 추가 기능
- 중고 물품의 거래 요청 기능

추가 기능
- 중고 물품 랭킹 3위까지 (좋아요 기준)
- (특정한) 중고 물품에 좋아요 달기 기능
- (특정한) 중고 물품에 댓글 달기 기능

### 구현해야 할 기능
- 게시글 삭제 기능   
- 중고 물품의 맞교환 기능
- 게시글에 가격 표기

---

중고 물품 분류 (디자인 안에서 6+1개까지 가능)

도서 (전공서적 등) books    
전자기기 techs    
의류 clothes    
자취용품 Houses    
기프티콘 coupons   
식품 foods   