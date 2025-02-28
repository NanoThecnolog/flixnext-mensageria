import { HttpException, HttpStatus } from "@nestjs/common"
import { UsersProps } from "@types"

export async function getAllUsers(): Promise<UsersProps[]> {
    try {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                news: true,
                verified: true
            }
        })
    } catch (err) {
        console.log("Erro ao buscar usuários", err)
        throw new HttpException('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR)
    }
}