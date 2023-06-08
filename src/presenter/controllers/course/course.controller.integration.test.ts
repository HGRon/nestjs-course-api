// @ts-ignore

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CourseController } from './course.controller';
import { CreateCourseUsecase } from '@/domain/usecases/course/create.usecase';
import { GetManyUsecase } from '@/domain/usecases/course/get-many.usecase';
import { GetOneUsecase } from '@/domain/usecases/course/get-one.usecase';
import { CourseDtoMapper } from '@/presenter/models/dto/course/course.dto.mapper';

describe('CourseController (integration)', () => {
  let app: INestApplication;
  let createCourseUsecase: CreateCourseUsecase;
  let getManyUsecase: GetManyUsecase;
  let getOneUsecase: GetOneUsecase;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CreateCourseUsecase,
        GetManyUsecase,
        GetOneUsecase,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    createCourseUsecase = moduleFixture.get<CreateCourseUsecase>(CreateCourseUsecase);
    getManyUsecase = moduleFixture.get<GetManyUsecase>(GetManyUsecase);
    getOneUsecase = moduleFixture.get<GetOneUsecase>(GetOneUsecase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /course/:id', () => {
    it('should return a course by ID', async () => {
      const courseId = 1;
      const mockCourse = { id: courseId, name: 'Test Course' };
      jest
        .spyOn(getOneUsecase, 'call')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return { course: mockCourse };
        });

      const response = await request(app.getHttpServer()).get(`/course/${ courseId }`);

      expect(response.status).toBe(HttpStatus.OK);
      // @ts-ignore
      expect(response.body).toEqual(CourseDtoMapper.toModel(mockCourse));
    });
  });

  describe('GET /course', () => {
    it('should return a list of courses', async () => {
      const mockCourses = [
        { id: 1, name: 'Course 1' },
        { id: 2, name: 'Course 2' },
      ];

      // @ts-ignore
      jest.spyOn(getManyUsecase, 'call').mockImplementation(async () => ({ courses: mockCourses }));

      const response = await request(app.getHttpServer()).get('/course');

      expect(response.status).toBe(HttpStatus.OK);

      // @ts-ignore
      expect(response.body).toEqual(mockCourses.map((course) => CourseDtoMapper.toModel(course)));
    });
  });

});
