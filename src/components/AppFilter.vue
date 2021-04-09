<template>
    <div class="filter">
        <div class="filter-title">Показать задачи </div>
        <select class="filter-select" v-model="selected">
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="pending">Выполняются</option>
            <option value="done">Завершены</option>
            <option value="cancelled">Отменены</option>
        </select>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: String
    },
    computed: {
        selected: {
            get() { 
                console.log('Get filter value: ' + this.modelValue);
                return this.modelValue;
            },
            set(value) { 
                console.log('Set filter value: ' + value);
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>

<style>

</style>