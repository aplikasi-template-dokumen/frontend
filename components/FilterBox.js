import style from '../styles/Filter.module.css'

export default function FilterBox() {
    return (
        <div className={style.container}>
            <h2>Filter Dokumen</h2>

            <form>
                {/* <div> */}
                    <p>Bahasa</p>
                    <select>
                        <option value=''>Pilih Bahasa</option>
                        <option value='id'>Indonesia</option>
                        <option value='eng'>Inggris</option>
                    </select>
                {/* </div> */}

                {/* <div> */}
                    <p className={style.sub}>Sub Kategori</p>
                    <select>
                        <option value=''>Pilih Sub Kategori</option>
                        <option value=''>Sub Kategori 1</option>
                        <option value=''>Sub Kategori 2</option>
                        <option value=''>Sub Kategori 3</option>
                        <option value=''>Sub Kategori 4</option>
                    </select>
                {/* </div> */}

                    <button>Filter</button>
            </form>
        </div>
    )
}