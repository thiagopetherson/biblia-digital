import { api } from 'boot/axios'

export default function useApi () {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMTAgMjAyMyAyMjoyNzozMiBHTVQrMDAwMC50aGlwZXRoZXJzb25AZ21haWwuY29tIiwiaWF0IjoxNjczMzg5NjUyfQ.L1IZ2P6TqSeHQsgfqkpnqmqdKqD6EmmUjggIpm_GnWo'
  const getBooks = async () => {
    try {
      const { data } = await api.get('books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getBookChapterVerses = async (abbrev, chapter) => {
    try {
      const data = await api.get(`verses/nvi/${abbrev}/${chapter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    getBooks,
    getBookChapterVerses
  }
}
