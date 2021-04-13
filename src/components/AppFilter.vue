<template>
    <div class="filter">
        <div class="filter-title">Show tasks</div>
        <select class="filter-select" v-model="selected">
            <option value="all">All</option>
            <option value="queue">Queue</option>
            <option value="doing">In progress</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
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
                // console.log('Get filter value: ' + this.modelValue);
                return this.modelValue;
            },
            set(value) { 
                // console.log('Set filter value: ' + value);
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>

<style>

</style>