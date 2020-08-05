import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = () => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      console.log('error')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: {
      name: author,
      born: Number(year)
    }})

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h3>edit author</h3>

      <form onSubmit={submit}>
        author name
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        born
        <input
          type='number'
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <br/>
        <button type='submit'>edit</button>
      </form>
    </div>
  )
}

export default EditAuthor
