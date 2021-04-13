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
            required: true,
            validator(value) {
                return ['queue', 'doing', 'completed', 'canceled'].includes(value);
            }
        },
    },
    data() {
        return {
            statuses: {
                queue: {
                    class: 'warning',
                    text: 'Queue'
                },
                completed: {
                    class: 'primary',
                    text: 'Completed'
                },
                canceled: {
                    class: 'danger',
                    text: 'Canceled'
                },
                doing: {
                    class: 'warning',
                    text: 'In progress'
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