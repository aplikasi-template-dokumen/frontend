import style from '../styles/Filter.module.css'

export default function FilterBox(data) {
    // console.log(data.data)
    // const []

    const handleFilter = (e, lang, sub) => {}

    return (
        <div className={style.container}>
            <h2>Filter Dokumen</h2>

            <form>
                {/* <div> */}
                    <p>Bahasa</p>
                    <select>
                        <option value={0}>Pilih Bahasa</option>
                        { data.data[0].length == 0 ? "Loading . . ." : data.data[0].map((item) => <option value={item.id} key={item.id}>{item.name}</option>) }
                    </select>
                {/* </div> */}

                {/* <div> */}
                    <p className={style.sub}>Sub Kategori</p>
                    <select>
                        <option value={0}>Pilih Sub Kategori</option>
                        { data.data[0].length == 0 ? "Loading . . ." : data.data[1].map((item) => <option value={item.id} key={item.id}>{item.name}</option>) }
                    </select>
                {/* </div> */}

                    <button>Filter</button>
            </form>
        </div>
    )
}