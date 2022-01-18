<script lang="ts">
	export let subTotal: number;
	export let vatCalculation: number;
	export let grandTotal: number;
</script>

<div class="flex flex-row w-full mt-5 justify-between pr-5">
	<div />
	<div class="text-right">
		<div class="grid grid-cols-2">
			<div>Sub Total</div>
			<div class="text-green-700">{subTotal.toLocaleString()}</div>
			<div>VAT 7%</div>
			<div class="text-green-700">{vatCalculation.toLocaleString()}</div>
			<div>Grand Total</div>
			<div class="text-green-700">{grandTotal.toLocaleString()}</div>
		</div>
	</div>
</div>
