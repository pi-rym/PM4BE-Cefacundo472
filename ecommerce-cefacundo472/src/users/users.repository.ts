import { Injectable } from "@nestjs/common";

export interface User {
  id:string;

 email: string;

 name: string;

 password: string;

 address: string,

 phone: number;

 country?: string | undefined;

 city?: string | undefined;
}

export const users: User[] = [
  {
    id: "1",
    email: "jon.snow@winterfell.com",
    name: "Jon Snow",
    password: "knowsnothing123",
    address: "Castle Black, The Wall",
    phone: 1155551234,
    country: "Westeros",
    city: "The North"
  },
  {
    id: "2",
    email: "daenerys.targaryen@dragonstone.com",
    name: "Daenerys Targaryen",
    password: "dracarys99",
    address: "Dragonstone Castle",
    phone: 1155555678,
    country: "Essos",
    city: "Meereen"
  },
  {
    id: "3",
    email: "tyrion.lannister@casterlyrock.com",
    name: "Tyrion Lannister",
    password: "wineandmind1",
    address: "Street of the Sisters",
    phone: 1155559876,
    country: "Westeros",
    city: "King's Landing"
  },
  {
    id: "4",
    email: "arya.stark@faceless.com",
    name: "Arya Stark",
    password: "needle123",
    address: "House of Black and White",
    phone: 1155554321,
    country: "Essos",
    city: "Braavos"
  },
  {
    id: "5",
    email: "cersei.lannister@redkeep.com",
    name: "Cersei Lannister",
    password: "powerispower77",
    address: "The Red Keep",
    phone: 1155558765,
    country: "Westeros",
    city: "King's Landing"
  }
];

@Injectable()
export class UsersRepository{
     getAllUsers(validPage: number, validLimit: number): any {

      const start = (validPage -1) * validLimit;
      const end = start + validLimit;

      const userList = users.slice(start, end);



        return userList.map(({ password, ...userNoPassword}) =>
        userNoPassword);
     }
    
    getUserById(id: string): any {
      const foundUser = users.find((user) => user.id === id);
      if (!foundUser) return `No se encontró el usuario con id: ${id}`;
      const { password, ...userNoPassword } = foundUser;

      return userNoPassword;
    }
 
    addUser(user:any){
      users.push({ ...user, id:user.email});
      return user.email;

    }

    getUserByEmail(email:string){
       return users.find((user)=> user.email === email); 
    }



    updateUser(id: string, userNewData:any){
      const foundUser = users.find((users) => users.id ===id);
      if(!foundUser) return 'No se encontro el usuario con id: ${id}';
      Object.assign(foundUser, userNewData)
      return id;

    }


    deleteUser(id:string){
      const foundIndex = users.findIndex((users) => users.id ===id);
      if(foundIndex === -1) return 'No se encontro el usuario con id: ${id}';
      users.splice(foundIndex, 1);
      return id;

    }

}

