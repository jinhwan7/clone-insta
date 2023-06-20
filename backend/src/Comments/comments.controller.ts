import { JwtPayload } from './../auth/jwt/jwt.payload.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, HttpCode, Put, UseGuards } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { getUser } from 'src/common/decorator/user.data.decorator';
import { CommentsService } from './comments.service';
import { CommentCreateDto } from './dtos/comment.create.dto';
import { CommentUpdateDto } from './dtos/comment.update.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CommentDeleteDto } from './dtos/comment.delete.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '특정 게시글의 모든 댓글 조회',
    description: 'Params 에 해당하는 게시글의 댓글을 조회한다.',
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 게시글의 댓글을 불러오려 시도 할 경우',
  })
  @ApiOkResponse({ description: '정상적으로 댓글을 전부 불러온 경우.' })
  @Get(':postId')
  async getAllComments(@Param('postId') postId: number, @getUser() a) {
    return await this.commentsService.getAllComments(postId);
  }

  @ApiOperation({
    summary: '댓글 작성하기',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body() data: CommentCreateDto,
    @getUser() payload: JwtPayload,
  ) {
    data.postId = postId;
    data.userId = payload.id;
    return await this.commentsService.createComment(data);
  }

  @ApiOperation({
    summary: '댓글 수정하기',
  })
  @ApiCreatedResponse({
    description: '댓글 수정에 성공 하였을 경우',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않은 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 댓글을 수정하려 할 경우' })
  @ApiNotFoundResponse({ description: '존재하지 않는 댓글을 수정하려 할 경우' })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() data: CommentUpdateDto,
    @getUser() payload: JwtPayload,
  ) {
    data.userId = payload.id;
    data.id = commentId;
    await this.commentsService.updateComment(data);
    return;
  }

  @ApiOperation({
    summary: '댓글 삭제하기',
  })
  @ApiNoContentResponse({
    description: '댓글 삭제에 성공 하였을 경우',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않은 경우',
  })
  @ApiForbiddenResponse({ description: '타인의 댓글을 삭제하려 할 경우' })
  @ApiNotFoundResponse({ description: '존재하지 않는 댓글을 삭제하려 할 경우' })
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @getUser() payload: JwtPayload,
  ) {
    const data: CommentDeleteDto = {
      id: commentId,
      userId: payload.id,
    };
    return await this.commentsService.deleteComment(data);
  }
}
