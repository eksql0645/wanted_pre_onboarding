const { Router } = require('express');
const Recruitment = require('../db/models/recruitment');
const Company = require('../db/models/company');
const recruitmentRouter = Router();

// 채용공고 등록
recruitmentRouter.post('/', async (req, res, next) => {
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

    // 중복 공고 생성 방지 / findAll은 배열을 반환한다.
    const isDuplicated = await Recruitment.findAll({
      where: { company_id, position },
    });

    if (isDuplicated.length > 0) {
      throw new Error('이미 등록된 포지션 공고입니다.');
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
    next(e);
  }
});

// 채용공고 목록 조회
recruitmentRouter.get('/', async (req, res, next) => {
  try {
    // 회사ID로 회사명, 국가, 지역 가져오기
    const recruitmentsList = await Recruitment.findAll({
      include: [
        { model: Company, attributes: ['company_name', 'nation', 'city'] },
      ],
      raw: true,
      attributes: ['id', 'position', 'compensation', 'stack'],
    });

    // 채용공고가 없는 경우
    if (recruitmentsList.length === 0) {
      throw new Error('채용 공고가 존재하지 않습니다.');
    }

    res.status(200).json(recruitmentsList);
  } catch (e) {
    next(e);
  }
});

// 채용공고 상세페이지 / 회사명, 국가, 지역, 채용내용, 회사가 올린 다른 채용공고
recruitmentRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // 채용공고가 존재하는지 확인
    const recruitment = await Recruitment.findOne({ id });

    if (!recruitment) {
      throw new Error('해당 채용공고가 존재하지 않습니다.');
    }

    res.status(200).json(recruitment);
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
