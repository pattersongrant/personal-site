import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold tracking-tighter">
        Grant Patterson
      </h1>
      <p className="mb-4">
        {`Software Engineer`}
        <br></br>
        {'Computer Science Student at the University of Michigan in Ann Arbor'}
        <br></br>
        <br></br>
        {'Nice to meet you'}
        <br></br>
        {'Love building, friends, family, reading, gym, playing sports, studying, competition'}
        <br></br>
        {'Hope to do and make some great big things in the world'}
        <br></br>
        {'Fun fact:'}
        <br></br>
        {'I was born in santa monica, CA.'}
        
        
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <img className="w-3/5"src="/fish.jpeg"></img>
    </section>

  )
}
