import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-4 text-4xl font-semibold tracking-tighter">
        Grant Patterson
      </h1>
      <p className="mb-4">
        <h1 className="text-2xl">Software Engineer &</h1>
        <h1 className="text-2xl">CS Student at the University of Michigan in Ann Arbor</h1>
        <br></br>
        {'Nice to meet you!'}
        <br></br>
        {'Love building, friends, family, reading, gym, sports, studying, competition.'}
        <br></br>
        {'Hope to do and make some great big things in the world.'}
        <br></br>
        
        
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <img className="w-2/5"src="/fish.jpeg"></img>
    </section>

  )
}
