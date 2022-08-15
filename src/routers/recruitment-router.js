const { Router } = require('express');
const Recruitment = require('../db/models/recruitment');
const Company = require('../db/models/company');
const recruitmentRouter = Router();

// 채용공고 등록
recruitmentRouter.post('/register', async (req, res, next) => {
  try {
    const { company_id, position, compensation, content, stack } = req.body;

    // 빈값 확인
    if (!company_id || !position || !compensation || !content || !stack) {
      throw new Error('빈값을 채워주세요.');
    }

    // 회사가 존재하는지 획인
    const isCompany = await Company.findOne({ where: { id: company_id } });

    if (!isCompany) {
      throw new Error('존재하지 않는 회사입니다. 다시 확인해주세요.');
    }

    // 중복 공고 생성 방지
    const isDuplicated = await Recruitment.findAll({
      where: { company_id, position },
    });

    if (isDuplicated) {
      throw new Error('이미 등록된 공고입니다.');
    }

    // 채용공고 생성
    const recruitment = await Recruitment.create({
      company_id,
      position,
      compensation,
      content,
      stack,
    });

    res.status(201).json(recruitment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 채용공고 목록 조회
recruitmentRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

// 채용공고 상세페이지
recruitmentRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

// 채용공고 수정
recruitmentRouter.patch('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

// 채용공고 삭제
recruitmentRouter.delete('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

module.exports = recruitmentRouter;
