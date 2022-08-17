# wanted_pre_onboarding

원티드 프리온보딩 백엔드 코스 사전과제를 위한 레포지토리입니다.

# 사용기술

JavaScript <br>
Node.js <br>
Express.js <br>
jest <br>
MySQL <br>
ORM(Sequelize)

# Insatallation

```jsx
npm install
```

# Running the App

```jsx
npm start
```

# Modeling

![image](https://user-images.githubusercontent.com/80232260/185081431-afe0e971-db1f-4969-8fe5-a007c77db4ad.png)

# 요구사항 분석 및 구현 과정

## 채용 공고 등록

**method** - post 

**요청주소** - localhost:3000/recruitment/

요청이 오면 req.body에서 요청 데이터를 추출한다. 요청 데이터 유무, 회사의 유무, 중복 공고 유무를 확인한다. 만약, 요청 데이터 중 빈값이 있거나, 회사가 존재하지 않거나, 중복 공고가 있다면 에러가 발생한다. 그게 아니라면 공고를 등록한다.

```json
{
    "id": 16,
    "company_id": 3,
    "position": "프론트엔드 주니어 개발자",
    "compensation": 500000,
    "content": "회사1에서 프론트엔드주니어 개발자를 채용합니다.",
    "stack": "react"
}
```

## 채용 공고 수정

**method** - patch

**요청주소** - localhost:3000/recruitment/:id

채용공고 id로 채용공고가 존재하는지 확인한다. 존재한다면, 수정 데이터를 해당 채용공고에 업데이트한다. 수정 데이터가 없다면 기존에 저장된 데이터를 유지하기 때문에 데이터의 유무 확인이 필요하지 않다. 수정 후 0 또는 1을 반환하기 때문에 수정된 데이터 조회해서 응답 데이터로 보낸다.

```json
{
    "id": 13,
    "company_id": 1,
    "position": "프론트엔드 개발자",
    "compensation": 1000000,
    "content": "회사1에서 프론트엔드주니어 개발자를 채용합니다.",
    "stack": "react"
}
```

## 채용 공고 삭제

**method** - delete

**요청주소** - localhost:3000/recruitment/:id

```json
"채용 공고가 삭제되었습니다."
```

## 채용 공고 목록 조회

**method** - get

**요청주소** - localhost:3000/recruitment/ 

recruitment/ get 요청을 보내면 등록된 채용공고 데이터가 배열에 담겨 응답한다.

채용공고가 없는 경우 에러를 던진다.

```javascript
[
    {
        "id": 13,
        "position": "프론트엔드 개발자",
        "compensation": 1000000,
        "stack": "react",
        "Company.company_name": "회사1",
        "Company.nation": "대한민국",
        "Company.city": "서울"
    },
    {
        "id": 16,
        "position": "프론트엔드 주니어 개발자",
        "compensation": 500000,
        "stack": "react",
        "Company.company_name": "회사3",
        "Company.nation": "대한민국",
        "Company.city": "서울"
    },
    {
        "id": 17,
        "position": "백엔드 주니어 개발자",
        "compensation": 500000,
        "stack": "react",
        "Company.company_name": "회사1",
        "Company.nation": "대한민국",
        "Company.city": "서울"
    },
    // ... 이하 생략
]
```

## 채용 공고 상세 페이지 조회

**method** - get

**요청주소** - localhost:3000/recruitment/:id

```json
{
    "id": 13,
    "position": "프론트엔드 개발자",
    "compensation": 1000000,
    "stack": "react",
    "content": "회사1에서 프론트엔드 개발자를 채용합니다.",
    "Company.company_name": "회사1",
    "Company.nation": "대한민국",
    "Company.city": "서울",
    "recruitmentListOfcompany": [
        13,
        17,
        18,
        19
    ]
}
```

## 채용 공고 검색 조회

**method** - get

**요청주소** - localhost:3000/recruitment/search

```javascript
// localhost:3000/recruitment/search?keyword=주니어
[
    {
        "id": 16,
        "company_id": 3,
        "position": "프론트엔드 주니어 개발자",
        "compensation": 500000,
        "content": "회사1에서 프론트엔드주니어 개발자를 채용합니다.",
        "stack": "react"
    },
    {
        "id": 17,
        "company_id": 1,
        "position": "백엔드 주니어 개발자",
        "compensation": 500000,
        "content": "회사1에서 프론트엔드 주니어 개발자를 채용합니다.",
        "stack": "react"
    }
]
```

## 사용자의 채용 공고 지원

**method** - 

**요청주소** -

```json

```

# 문제점 / 해결과정

- DB 설계 시 테이블의 필드 구성과 테이블 간의 관계를 설정하는 부분이 어려웠지만, 요구사항을 분석하고 손으로 관계를 정립해보면서 해결했다.
- 어떤 에러들을 처리해야 할지 감이 오지 않았는데 API 구현 후 포스트맨으로 테스트하면서 필요한 에러들이 생각나서 추가했다.
- 검색 조회 API 구현 시 쿼리스트링 배웠지만 사용한 적이 없었고, sequelize로 필터링 하는 방법을 몰랐는데 구글링을 통해 쿼리를 찾아서 해결했다.
- 채용공고 상세페이지에서 채용공고 데이터와 회사 데이터를 어떻게 합쳐야 할 지 고민되었다. include를 사용해서 해결했지만 데이터의 depth(객체 안에 객체..) 차이가 났다. 이전에도 이런 경험이 있어서 노션에 작성해둔 글을 보고 속성을 추가하여 해결했다.
- 회사가 올린 채용공고 목록을 어떻게 가져와야 할지 고민하다가 책에서 관계쿼리에 대한 내용을 보고 적용하여 해결했다.
- 제일 어려웠던 부분은 초기설정과 DB 설계였다. 초기 설정은 프로젝트 제일 처음에 하다보니 기억이 희미해서 시간을 많이 소비했다. 초기 설정 이후에도 ESLint 에러가 발생했지만 개인프로젝트를 하면서 겪었던 에러여서 이 역시 노션에 작성해둔 글을 보고 해결했다.

# API Document

[https://documenter.getpostman.com/view/20910080/VUqmueV5](https://documenter.getpostman.com/view/20910080/VUqmueV5)

# Convetion

## Code Convetion

**MysSQL** snake case 사용, 테이블명은 s를 붙인다. 

**Sequelize** snake case 사용

**나머지** camel case 사용

**모듈** commonJS

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

## Git Commit Message Convention

![image](https://user-images.githubusercontent.com/80232260/185080883-b9a4e5f3-0d34-4b35-98c7-8f47915d4b64.png)

[참고 사이트](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-git-%EC%BB%A4%EB%B0%8B%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
