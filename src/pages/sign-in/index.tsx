import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh_-_40px)] lg:grid-cols-2 mt-[40px]">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://avatars.mds.yandex.net/i?id=41e15638611417c9450a293fed78208b_l-4885523-images-thumbs&n=13"
          alt="Image" 
          className="absolute inset-0 object-cover size-full dark:brightness-[0.2] dark:grayscale"
        />
        <p className="text-3xl font-black absolute flex justify-center items-center size-full text-center px-10">
          Лучшие сервера в мире ваще топ рекомендую заходи пока вот слева 
        </p>
      </div>
    </div>
  )
}
