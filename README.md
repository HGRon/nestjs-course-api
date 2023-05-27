# CLEAN ARCH and DDD API

Features:
- Authentication
- Create Courses
- User Course
- Create User

# Architecture

I'm using clean architecture to build this API.

## Domain

**Entities**: The core business objects of our application.

**Usecases**: Application-specific business rules, independent of any external elements. They will describe how the entities are used to achieve some goal.

**Exceptions**: Business rules exceptions to show that something unexpected or invalid has occurred.

**Contracts**: Interfaces to interact with external elements (Dependency Inversion).

## Infrastructure

**Database**:
- Schemas: Database schemas (tables)
- Repositories: The implementation of the repositories
- Mappers: They transform Entities into Schema and Schema into Entities
- Services: External services

## Presenter

**Controllers**: HTTP controllers

**Models**: 
- DTO: DTO representing the request body
- Queries: DTO representing query params
- View Models: DTO representing the response body

**Modules**: API modules that will handle our dependency injections

# Database

Data are saving in memory to not need to use DATABASE
