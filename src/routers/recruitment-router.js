const { Router } = require('express');

const recruitmentRouter = Router();

// 채용공고 등록
recruitmentRouter.post('/', (req, res, next) => {});

// 채용공고 목록 조회
recruitmentRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

// 채용공고 상세페이지
recruitmentRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

// 채용공고 수정
recruitmentRouter.patch('/', async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

// 채용공고 삭제
recruitmentRouter.delete('/', async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

module.exports = recruitmentRouter;
