// src/db/entities/user-academic.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserInfo } from "./user-info.entity";

@Entity("UserAcademicsTB")
export class UserAcademic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolName: string;

  @Column()
  degree: string;

  @Column()
  graduationYear: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.academics)
  @JoinColumn()
  userInfo: UserInfo;
}
