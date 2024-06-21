"use client"
import React from 'react';
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from '@/utilities/apiUrl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OrderType } from '@/types/types';
import Image from 'next/image';


const OrderPage = () => {

  const {data: session, status} = useSession();
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch(`${apiUrl}/api/orders`).then((res) =>
        res.json(),
      ),
  })

  if(status === "unauthenticated"){
    router.push("/");
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;


  }
  
  if (isPending || status === "loading") return 'Loading...';

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((item: OrderType, index: number) => (
              <tr key={index} className="text-sm md:text-base bg-red-50">
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">{item.createdAt.toString().slice(0,10)}</td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">{item.products[0].title}</td>
                {session?.user.isAdmin ? (<td className="py-6 px-1">
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                    <button className="bg-red-400 p-2 rounded-full">
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>) : (<td className="py-6 px-1">{item.status}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderPage;
