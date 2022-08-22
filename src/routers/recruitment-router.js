const { Router } = require('express');
const Recruitment = require('../db/models/recruitment');
const Company = require('../db/models/company');
const recruitmentRouter = Router();
const { Op } = require('sequelize');
const Applicant = require('../db/models/applicant');
const User = require('../db/models/user');

// 채용공고 등록
recruitmentRouter.post('/', async (req, res, next) => {
  try {
    const { companyId, position, compensation, content, stack } = req.body;

    // 빈값 확인
    if (!companyId || !position || !compensation || !content || !stack) {
      throw new Error('빈값을 채워주세요.');
    }

    // 회사가 존재하는지 획인
    const isCompany = await Company.findOne({ where: { id: companyId } });

    if (!isCompany) {
      throw new Error('존재하지 않는 회사입니다. 다시 확인해주세요.');
    }

    // 중복 공고 생성 방지 / findAll은 배열을 반환한다.
    const isDuplicated = await Recruitment.findAll({
      where: { company_id: companyId, position },
    });

    if (isDuplicated.length > 0) {
      throw new Error('이미 등록된 포지션 공고입니다.');
    }

    // 채용공고 생성
    const recruitment = await Recruitment.create({
      company_id: companyId,
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

// 사용자의 채용공고 지원
recruitmentRouter.post('/applicant', async (req, res, next) => {
  try {
    const { applicantId, recruitmentId } = req.body;

    // 지원정보 유무 확인
    if (!applicantId || !recruitmentId) {
      throw new Error('지원정보를 입력해주세요.');
    }

    // 지원자, 채용공고 존재 확인
    const isApplicant = await User.findOne({ where: { id: applicantId } });
    const isRecruitment = await Recruitment.findOne({
      where: { id: recruitmentId },
    });

    if (!isApplicant || !isRecruitment) {
      throw new Error('채용 정보가 잘못되었습니다.');
    }

    // 채용공고에 지원했는지 확인
    const isApplied = await Applicant.findOne({
      where: { applicant_id: applicantId, recruitment_id: recruitmentId },
    });

    if (isApplied) {
      throw new Error('이미 해당 채용공고에 지원하셨습니다.');
    }

    // 채용공고 지원
    const applicant = await Applicant.create({
      applicant_id: applicantId,
      recruitment_id: recruitmentId,
    });
    res.status(201).json(applicant);
  } catch (e) {
    next(e);
  }
});

// 채용공고 목록 조회
recruitmentRouter.get('/', async (req, res, next) => {
  try {
    const recruitmentList = await Recruitment.findAll({
      // 회사ID로 회사명, 국가, 지역 가져오기
      include: [
        { model: Company, attributes: ['company_name', 'nation', 'city'] },
      ],
      raw: true,
      // 필요한 필드만 추출
      attributes: ['id', 'position', 'compensation', 'stack'],
    });

    // 채용공고가 없는 경우
    if (recruitmentList.length === 0) {
      throw new Error('채용 공고가 존재하지 않습니다.');
    }

    res.status(200).json(recruitmentList);
  } catch (e) {
    next(e);
  }
});

// 채용공고 검색 조회
recruitmentRouter.get('/search', async (req, res, next) => {
  try {
    // 쿼리스트링으로 입력된 키워드 가져오기
    const { keyword } = req.query;

    // position, content, stack에서 유사검색하기
    const result = await Recruitment.findAll({
      where: {
        [Op.or]: [
          {
            position: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            content: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            stack: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });

    // 일치하는 데이터가 없는 경우
    if (result.length === 0) {
      throw new Error('일치하는 공고가 존재하지 않습니다.');
    }

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

// 채용공고 상세페이지
recruitmentRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // 채용공고가 존재하는지 확인
    let recruitment = await Recruitment.findOne({ where: { id } });
    if (!recruitment) {
      throw new Error('해당 채용공고가 존재하지 않습니다.');
    }

    // 채용공고가 존재한다면 그 채용공고에 등록된 company_id 추출
    const companyId = recruitment.company_id;

    // 채용공고 가져오기
    recruitment = await Recruitment.findOne({
      include: [
        { model: Company, attributes: ['company_name', 'nation', 'city'] },
      ],
      raw: true,
      where: { id },
      attributes: ['id', 'position', 'compensation', 'stack', 'content'],
    });

    // 회사가 올린 채용공고 목록 가져오기
    const company = await Company.findOne({
      include: [{ model: Recruitment }],
      where: { id: companyId },
    });

    const recruitList = await company.getRecruitments();

    // recruitList에서 id만 추출
    const recruitmentListOfcompany = recruitList.map((e) => e.id);

    // recruitment에 회사가 올린 채용공고 목록 추가
    recruitment.recruitmentListOfcompany = recruitmentListOfcompany;

    res.status(200).json(recruitment);
  } catch (e) {
    next(e);
  }
});

// 채용공고 수정
recruitmentRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { position, compensation, content, stack } = req.body;

    // 채용공고가 존재하는지 확인
    let recruitment = await Recruitment.findOne({ where: { id } });

    if (!recruitment) {
      throw new Error('채용공고가 존재하지 않습니다.');
    }

    // 수정하기
    recruitment = await Recruitment.update(
      { position, compensation, content, stack },
      { where: { id } }
    );

    // 수정 데이터 가져오기
    recruitment = await Recruitment.findOne({ where: { id } });

    res.status(200).json(recruitment);
  } catch (e) {
    next(e);
  }
});

// 채용공고 삭제
recruitmentRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let result = '';

    // 채용공고가 존재하는지 확인
    let recruitment = await Recruitment.findOne({ where: { id } });

    if (!recruitment) {
      throw new Error('채용공고가 존재하지 않습니다.');
    }

    // 채용 공고 삭제
    recruitment = await Recruitment.destroy({ where: { id } });

    // 채용 공고 삭제 성공 시 삭제 알림
    if (recruitment === 1) {
      result = '채용 공고가 삭제되었습니다.';
    }

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = recruitmentRouter;
