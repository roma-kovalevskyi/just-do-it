<template>
    <span 
        :class="['badge', statusClass]"
    >{{ statusText }}
    </span>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            statuses: {
                active: {
                    class: 'primary',
                    text: 'Активен'
                },
                done: {
                    class: 'primary',
                    text: 'Завершен'
                },
                cancelled: {
                    class: 'danger',
                    text: 'Отменен'
                },
                pending: {
                    class: 'warning',
                    text: 'Выполняется'
                }
            }
        }
    },
    computed: {
        statusClass() {
            return this.statuses[this.type].class;
        },
        statusText() {
            return this.statuses[this.type].text;
        }
    }
}
</script>