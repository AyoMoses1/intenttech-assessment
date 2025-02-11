import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

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

@Entity("UserContactTB")
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  linkedInUrl: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  userInfo: UserInfo;
}

@Entity("UserAddressTB")
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  userInfo: UserInfo;
}

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
