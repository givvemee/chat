import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser) {
      return new NextResponse('인증되지 않은 사용자입니다.', { status: 401 });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, '에러_세팅');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
