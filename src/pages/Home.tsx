import { PostList } from "@/components/posts/PostList"
import { Search } from '@/components/layout/Search'

const headingStyle = "flex items-center gap-2 font-semibold text-5xl justify-center"

export const Home = () => {
  return (
    <>
      <section className="flex flex-col gap-6 mt-10 mb-10">
        <h1 className={headingStyle}>
          Aprenda programação, tecnologia
        </h1>
        <h1 className={headingStyle}>
          e desenvolvimento web com artigos
        </h1>
        <h1 className={headingStyle}>
          criados por estudantes e docentes.
        </h1>
      </section>
      <section className="flex items-center justify-between border-b-2 mb-8">
        <h2 className="text-2xl justify-center my-8">
          Explorar Posts
        </h2>
        <Search />
      </section >
      <PostList />
    </>
  )
}

