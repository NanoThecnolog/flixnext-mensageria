import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { UsersProps } from "@types"

const prisma = new PrismaClient()

export async function getAllUsers(): Promise<UsersProps[]> {
    try {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                news: true,
                verified: true
            }
        })
        return users
    } catch (err) {
        console.log("Erro ao buscar usuários", err)
        throw new HttpException('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR)
    }
}