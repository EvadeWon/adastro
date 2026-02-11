import { connectDB } from "@/dbConfig/dbConfig";
// import Purchase from "@/models/purchase";
// import User from "@/models/userModel";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
    await connectDB();

    // const session = await getServerSession({ req, ...authOptions });
    // if (!session?.user?.email) {
    //     return new Response(JSON.stringify({ enrolled: false }), { status: 401 });
    // }

    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId");
    if (!courseId) return new Response(JSON.stringify({ message: "courseId is required" }), { status: 400 });

    // const user = await User.findOne({ email: session.user.email });
    // if (!user) return new Response(JSON.stringify({ enrolled: false }), { status: 404 });

    // ✅ Check in Purchase collection
    // const purchase = await Purchase.findOne({
    //     userId: user._id,
    //     courseId: Number(courseId),
    //     status: "PAID",
    // });

    // return new Response(JSON.stringify({ enrolled: !!purchase }), { status: 200 });
}
