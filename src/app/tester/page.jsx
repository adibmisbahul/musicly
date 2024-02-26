import ListItems from "../component/topartis/topArtis"

import coba12 from "../assets/24k magic.webp"

export default function Tester () {

    const items = [
        {text: 'item1', imager:coba12 }
    ]
    return(
        <div>
            <ListItems items={items}/>
        </div>
    )
}