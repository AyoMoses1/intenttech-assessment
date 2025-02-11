// src/db/entities/user-info.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { UserContact } from "./user-contact.entity";
import { UserAddress } from "./user-address.entity";
import { UserAcademic } from "./user-academic.entity";

@Entity("UserInfoTB")
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "date" })
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @OneToOne(() => UserContact, (contact) => contact.userInfo, { cascade: true })
  contact: UserContact;

  @OneToOne(() => UserAddress, (address) => address.userInfo, { cascade: true })
  address: UserAddress;

  @OneToMany(() => UserAcademic, (academic) => academic.userInfo, {
    cascade: true,
  })
  academics: UserAcademic[];
}
