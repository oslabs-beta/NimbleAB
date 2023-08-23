import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../../../components/LogoutButton';
import NavBar from '../../../components/NavBar';

import { notFound, redirect, useParams } from 'next/navigation';
export const dynamicParams = false;

export async function getBlogPost(slug: string) {
  //Makes some fetch call to pull down blog post from database
  return slug;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) return notFound();
  return (
    <div className="bg-slate-700 flex flex-col items-end drop-shadow">
      <NavBar />
      <div className="flex flex-col text-white items-center bg-slate-800 h-full w-full">
        <h1 className="text-white text-4xl mt-10 mb-10">Title</h1>
        <p className="textlg mb-4">
          You have been served variant {slug}, Which 33% of all users see!
        </p>
        <div className="flex gap-4">
          <p className="text-lg">Written By Team JAZ</p>
          <p className="text-lg text-white/60">August 30, 2023</p>
        </div>
        <p className="w-1/2 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi odio
          earum cum quidem mollitia officiis iusto laudantium excepturi
          veritatis ad, sint quam. Eum maxime, excepturi illum omnis nemo
          explicabo quibusdam ullam culpa voluptatum sapiente reprehenderit
          laudantium et autem deserunt numquam ipsum corporis labore repellendus
          inventore cum dolorum beatae perspiciatis iure! Soluta, illo, laborum
          nemo voluptas iure magnam eius, ipsa tenetur enim qui vitae nulla?
          Inventore non ex eaque quasi! Animi doloribus deleniti dolorum dicta
          necessitatibus dolores harum modi, culpa saepe, maxime fuga laboriosam
          laborum sint voluptatum velit. Eum debitis perspiciatis maxime
          repellat. Necessitatibus nihil reiciendis sequi praesentium, nostrum
          consequuntur laborum rem, quidem fugit numquam cupiditate nesciunt
          voluptates, debitis esse! Nemo dolorum officiis suscipit a
          voluptatibus minus saepe sint mollitia possimus tempore. Neque, nemo
          cumque odio quidem quod corporis dolores, laborum obcaecati sapiente
          iure totam cupiditate quia doloremque non amet! Magni quae dolor esse
          laboriosam ullam, cumque doloribus dicta tempora, modi cum dolorum
          perferendis fugiat vel dolores totam blanditiis numquam unde qui
          voluptates. Tempore quas molestias magnam illum dolorem. Nisi quisquam
          porro praesentium labore, ipsa non nobis magni temporibus doloribus?
          Accusamus dicta earum voluptas enim beatae quo? Expedita molestias
          ipsa nobis quibusdam, nulla ullam voluptates eligendi voluptas!
          Adipisci, perspiciatis. At temporibus alias neque, magnam reiciendis
          maiores? Eveniet et earum, consectetur inventore exercitationem
          incidunt, saepe neque, culpa maiores quisquam debitis nulla natus quod
          voluptate reprehenderit. Ab, laborum asperiores magnam dolor vitae
          veritatis saepe placeat recusandae animi quo voluptate, commodi
          excepturi! Dolor nam optio error est! Tempora, odit doloribus! Nemo
          aut amet porro doloremque voluptatum eveniet quae mollitia laudantium,
          minima placeat necessitatibus error illo iure sunt esse, rem totam.
          Necessitatibus quaerat repellendus magni ipsum at, saepe molestias
          quam delectus numquam laboriosam ab ea excepturi, minus nostrum
          placeat architecto est temporibus sit tenetur odio nobis, eius
          laudantium atque debitis. Architecto quibusdam consequatur temporibus
          nemo earum eos? Velit, fugiat alias praesentium dolorum accusamus
          facilis odio optio sint dolore deserunt itaque porro accusantium
          voluptate molestiae deleniti laudantium debitis harum perferendis
          magnam. Quaerat veritatis officiis quo vel a, dolore eos iste quis
          eius eaque asperiores maiores mollitia culpa? Illum maiores ea id.
          Corporis, qui. Quod nostrum delectus eaque temporibus possimus id enim
          expedita accusamus, nihil officia nesciunt? Quo voluptas dolorum neque
          molestiae, ad suscipit temporibus saepe adipisci libero aliquid
          eligendi, quam ullam corrupti error rem porro deleniti minus
          distinctio iusto nemo illo vel laboriosam quibusdam! Omnis, fugit?
          Soluta quae veniam odit ratione voluptatibus iusto eveniet hic
          similique porro, aliquam temporibus a, molestiae cupiditate tenetur
          eius praesentium repudiandae possimus inventore culpa explicabo!
          Quasi, qui doloremque quam assumenda quod necessitatibus mollitia aut
          dignissimos dolore aperiam repudiandae. Magni dolorem doloribus,
          voluptate officiis ab officia. Molestiae assumenda, sed optio repellat
          cupiditate veniam sunt iusto soluta. Corporis officia velit autem
          veniam quos cumque porro fugit quibusdam delectus inventore excepturi
          sint molestias earum voluptas, quidem expedita nemo distinctio magni
          quis odio quaerat impedit laudantium alias ullam! Eveniet est
          explicabo hic rem reprehenderit, dignissimos voluptatum itaque
          sapiente nesciunt officia ea soluta recusandae, porro obcaecati ab
          nisi doloremque officiis labore aliquam? Sit odit dolorem assumenda!
        </p>
      </div>
    </div>
  );
}
export function generateStaticParams() {
  return [{ slug: '1' }, { slug: '2' }, { slug: '3' }];
}
