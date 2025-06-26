use anchor_lang::prelude::*;

declare_id!("Eznvs52WmhXMkvQksFxzmize2Ektw7K4UedCY3AGp1kb");

#[program]
pub mod solana_booking_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
