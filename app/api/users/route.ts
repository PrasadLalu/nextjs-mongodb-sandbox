import { connectToDatabase } from '@/app/lib/mongodb';
import User, { IUser } from '@/app/models/User.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();
        const users: IUser[] = await User.find({}).sort({ updatedAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: `Failed to list users: ${error}` }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { name, email, password } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already created with same email' }, { status: 409 });
        }

        const newUser: IUser = await User.create({
            name,
            email,
            password,
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to create user: ${error}` }, { status: 500 });
    }
}
