import { useAppStore } from '../../shared/store'
import { Select } from '../'

export const Categories = () => {
    const { categories, currentCategoryId, currentLocale, setCategory } =
        useAppStore()

    const handleChangeCategory = (value: number) => {
        setCategory(value)
    }

    return (
        <Select
            options={categories.map(category => ({
                label: category.name[currentLocale],
                value: Number(category.id),
            }))}
            defaultValue={currentCategoryId}
            onChange={handleChangeCategory}
            placeholder='Выберите категорию'
        />
    )
}
