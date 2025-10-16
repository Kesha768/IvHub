"use client"
import Image from "next/image";
import { FaRegCommentDots } from 'react-icons/fa';
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { PiShareFat } from "react-icons/pi";

type Author = { id: string; name: string; avatarUrl: string };
type Comment = { id: string; author: Author; text: string; createdAt: string; likes: number };
type Post = {
    id: number;
    author: Author;
    createdAt: string;
    text: string;
    imageUrl: string | null;
    pdfUrl: string | null;
    likes: number;
    commentsCount: number;
    comments: Comment[];
};

interface User {
    name: string
    direction: string
    group: string
    id: string
    role: string
    subgroup: string
}
const API_URL = "http://localhost:4000";

const PostBlock: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [infoUser, setInfoUser] = useState<User | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/posts?_sort=id&_order=desc`)
            .then(r => r.json())
            .then((data: Post[]) => setPosts(data))
            .finally(() => setLoading(false));


        const stored = typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : null;
        const id = stored || "1";
        fetch(`${API_URL}/users/${id}`)
            .then(r => r.ok ? r.json() : null)
            .then(u => setInfoUser(u))
            .catch(() => { });
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className='border border-[#0D0D0DF7] rounded-[10px] mt-[17px] py-[10px] px-[15px]'>
                    <div className='flex flex-row items-center w-full gap-x-[10px] py-[11px]'>
                        <Image src={post.author.avatarUrl || "/logo.png"} alt="avatar" className='w-[64px] h-[64px] rounded-[50%]' width={64} height={64} />
                        <div className='flex flex-col items-start'>
                            <span className='font-[400] text-[18px] font-[Unbounded] text-[var(--black)]'>{post.author.name}</span>
                            <span className='font-[400] text-[12px] text-[var(--color3)]'>{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                    </div>

                    {post.imageUrl && (
                        // data URL or path
                        <img alt='post-image' src={post.imageUrl} className='w-full h-auto' />
                    )}

                    {post.text && (
                        <p className='text-sm text-[#111827] mt-[10px]'>{post.text}</p>
                    )}

                    {post.pdfUrl && (
                        <a href={post.pdfUrl} target='_blank' rel='noreferrer' className='flex items-center text-sm gap-2 cursor-pointer bg-[#7878801F] max-w-fit py-1.5 px-2 mt-2 rounded-[8px]'>
                            Презентация.pdf <IoClose color='#3C3C43B8' />
                        </a>
                    )}

                    <div className='flex gap-2 mt-3 items-center cursor-pointer'>
                        <p className='bg-[#00539F] w-fit flex justify-center items-center gap-1 text-white text-[12px] font-light p-2 rounded-[10px] h-[35px]'>❤️ {/* {post.likes} */} {Math.floor(Math.random() * 1000)}</p>
                        <p className='bg-[#00539F] w-fit flex justify-center items-center gap-1 text-white text-[12px] font-light p-2 rounded-[10px] h-[35px]'><FaRegCommentDots />{/* post.commentsCount */ Math.floor(Math.random() * 100)} комментов</p>
                        <p className='bg-[#00539F] flex justify-center items-center gap-1 text-white text-[15px] font-light p-2 rounded-[10px] w-[40px] h-[35px]'><PiShareFat /></p>
                        <p className='flex items-center gap-1 text-[12px]'><IoEyeOutline size={"17px"} /> {Math.floor(Math.random() * 10000)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostBlock;

