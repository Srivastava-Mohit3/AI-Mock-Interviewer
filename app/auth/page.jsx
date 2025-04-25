// "use client";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/services/supabaseClient";
// import Image from "next/image";
// import React from "react";

// const Login = () => {
//   const signInWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });
//     if (error) {
//       console.log("Error: ", error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen ">
//       <div className="flex flex-col items-center border rounded-2xl p-8">
//         <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[100px]'/>
//         <div className="flex flex-col items-center rounded-2xl  ">
//           <Image
//             src={"/login.jpg"}
//             alt="login"
//             width={600}
//             height={400}
//             className="w-[400px] h-[250px]"
//           />
//           <h2 className="text-2xl font-bold text-center mt-5">
//             Welcome to AI Mock Interview
//           </h2>
//           <p className="text-gray-500 text-center ">
//             Sign In With Google Authentication
//           </p>
//           <Button className="mt-7 w-full" onClick={signInWithGoogle}>
//             {" "}
//             Login with Google{" "}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [router]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-[100px]"
        />
        <div className="flex flex-col items-center rounded-2xl  ">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px]"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to AI Mock Interview
          </h2>
          <p className="text-gray-500 text-center ">
            Sign In With Google Authentication
          </p>
          <Button className="mt-7 w-full" onClick={signInWithGoogle}>
            {" "}
            Login with Google{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
