import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/creare-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  private readonly songs = [];

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    console.log(songDTO.artists);

    // find all the artits on the based on ids
    const artists = await this.artistRepository.findByIds(songDTO.artists);
    console.log(artists);
    //set the relation with artist and songs
    song.artists = artists;

    return this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // throw new Error('Error occured while fetching data from db.');
    // return this.songs;
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  update(id: number, updateSongDto: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, updateSongDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.songRepository.delete(id);
  }
  paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
