import { knexInstance as knex } from "../../database/connection/database";
import RefreshTokenInterface from "./RefreshTokenInterface";
import UIDGenerator from "uid-generator";

export default class RefreshToken {
  refresh_token: string;
  user_id: number;
  device_id: string;

  constructor(refreshTokenInfo: RefreshTokenInterface) {
    this.refresh_token = refreshTokenInfo.refresh_token;
    this.user_id = refreshTokenInfo.user_id;
    this.device_id = refreshTokenInfo.device_id;
  }

  async createRefreshTokenRegister(): Promise<any> {
    return knex("refresh_token").insert(this);
  }

  static async findRefreshTokenRegister(searchInfo: any): Promise<any> {
    const query = searchInfo;

    return knex("refresh_token").where(query).select("*");
  }

  static async updateRefreshTokenRegister(searchInfo: any): Promise<any> {
    const uidgen = new UIDGenerator();
    const newRefreshToken: string = await uidgen.generate();
    const query = searchInfo;

    return knex("refresh_token")
      .where(query)
      .update(
        {
          refresh_token: newRefreshToken,
          updated_at: new Date(Date.now()).toISOString(),
        },
        ["refresh_token"]
      );
  }

  static async deleteRefreshTokenRegister(searchInfo: any): Promise<any> {
    const query = searchInfo;

    return knex("refresh_token").where(query).del("*");
  }
}
