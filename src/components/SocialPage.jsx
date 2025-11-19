import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function SocialPage(){
  const [games, setGames] = useState([])
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ title:'', sport:'football', visibility:'public', description:'' })
  const [post, setPost] = useState('')

  const load = ()=>{
    fetch(`${API}/api/games`).then(r=>r.json()).then(setGames)
    fetch(`${API}/api/posts`).then(r=>r.json()).then(setPosts)
  }
  useEffect(()=>{ load() },[])

  const createGame = async ()=>{
    await fetch(`${API}/api/games`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setForm({ title:'', sport:'football', visibility:'public', description:'' })
    load()
  }

  const createPost = async ()=>{
    await fetch(`${API}/api/posts`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ content: post }) })
    setPost('')
    load()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
          <div className="text-white font-semibold mb-2">Create a Game</div>
          <div className="grid sm:grid-cols-2 gap-2">
            <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" />
            <select value={form.sport} onChange={e=>setForm({...form,sport:e.target.value})} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              <option>football</option>
              <option>basketball</option>
              <option>badminton</option>
            </select>
            <select value={form.visibility} onChange={e=>setForm({...form,visibility:e.target.value})} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              <option>public</option>
              <option>private</option>
            </select>
            <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" />
            <button onClick={createGame} className="sm:col-span-2 px-4 py-2 rounded-lg bg-blue-600 text-white">Host</button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-white font-semibold mb-2">Community Feed</div>
          <div className="flex gap-2 mb-3">
            <input value={post} onChange={e=>setPost(e.target.value)} placeholder="Share something..." className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" />
            <button onClick={createPost} className="px-3 py-2 rounded-lg bg-green-600 text-white">Post</button>
          </div>
          <div className="space-y-3">
            {posts.map((p,i)=> (
              <div key={i} className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-200">{p.content}</div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-white font-semibold mb-3">Games</div>
          <div className="space-y-3">
            {games.map((g)=> (
              <div key={g.id} className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-200">
                <div className="font-semibold">{g.title}</div>
                <div className="text-sm text-slate-400">{g.sport} • {g.visibility}</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm">Join</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-white text-sm">Chat</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
