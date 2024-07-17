import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/creare-song-dto';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // @Get()
  // findAll() {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (e) {
  //     console.log('server error::::::::::::', e);
  //     throw new HttpException(
  //       'Internal server error!',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       { cause: e },
  //     );
  //   }
  // }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.paginate({ page, limit });
    } catch (e) {
      console.log('server error::::::::::::', e);
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // ParseIntPipe
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return this.songsService.findOne(id);
    } catch (e) {
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Post()
  create(@Body() createSongDto: CreateSongDTO) {
    return this.songsService.create(createSongDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.delete(id);
  }
}
