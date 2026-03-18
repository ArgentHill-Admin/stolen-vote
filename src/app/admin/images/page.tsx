import { createServerClient } from '@/lib/supabase/server'
import { ImageLibrary } from '@/components/admin/ImageLibrary'

export const dynamic = 'force-dynamic'

export default async function ImagesPage() {
  const supabase = createServerClient()
  const { data: images } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Image Library</h1>
        <p className="text-gray-500 text-sm mt-1">
          {images?.length ?? 0} image{images?.length !== 1 ? 's' : ''} stored
        </p>
      </div>
      <ImageLibrary images={images ?? []} />
    </div>
  )
}
