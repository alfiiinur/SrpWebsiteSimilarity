import HeaderNavigate from "./HeaderNavigate"
import ChipNavigate from "./ChipNavigate"

const Navigator = () => {
    return (<HeaderNavigate>
        <ChipNavigate
            href={"/"}
            color={"bg-greenDrak-btn-primary"}
        >Homepage</ChipNavigate>

        <ChipNavigate
            href={"/tutorial"}
            color={"bg-card_green_primary"}
        >Tutorial</ChipNavigate>

        <ChipNavigate
            href={"/practice"}
            color={"bg-blueCloud-btn-primary"}
        >
            Practice
        </ChipNavigate>
    </HeaderNavigate>)
}

export default Navigator