import User from '@/app/models/User.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: `User not found with id: ${id}` }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: `Failed to find user by id ${error}` }, { status: 500 });
    }
}
